<?php

namespace App\Controller;

use App\Entity\Video;
use App\OEmbed\Exception\OEmbedUnavailableException;
use App\Repository\VideoRepository;
use App\OEmbed\Service\OEmbedService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class VideoController
 * @package App\Controller
 * @Route("/api", name="video_api")
 */
class VideoController extends AbstractController
{
    /**
     * @param VideoRepository $videoRepository
     * @param OEmbedService $embedService
     * @return JsonResponse
     * @Route("/video", name="video", methods={"GET"})
     */
    public function getVideos(VideoRepository $videoRepository, OEmbedService $embedService)
    {
        $data = $videoRepository->findAll();

        $data = array_map(function(Video $video) use ($embedService) {
            try {
                $video->setOembed($embedService->fetchOEmbed($video->getRemoteId(), $video->getProvider()));
            }
            catch (OEmbedUnavailableException $exception) {

            }

            return $video;

        }, $data);

        return $this->json($data);
    }

    /**
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param VideoRepository $videoRepository
     * @Route("/video", name="video_add", methods={"POST"})
     * @return JsonResponse
     */
    public function addVideo(Request $request, EntityManagerInterface $entityManager, VideoRepository $videoRepository)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        try {
            $request = $this->transformRequestBody($request);

            $errors = [];

            if (!$request->get('name')) {
                $errors[] = 'Missing name parameter';
            }

            if (!$request->request->get('remote_id')) {
                $errors[] = 'Missing remote_id parameter';
            }

            if (!$request->request->get('provider')) {
                $errors[] = 'Missing provider parameter';
            }

            if (!empty($errors)) {
                throw new \Exception(implode(', ', $errors));
            }

            $video = new Video();

            $video->setName($request->get('name'));
            $video->setDescription($request->request->get('description'));
            $video->setProvider($request->request->get('provider'));
            $video->setRemoteId($request->request->get('remote_id'));

            $entityManager->persist($video);
            $entityManager->flush();

            return $this->json($video);

        } catch (\Exception $exception) {
            $data = [
                'status' => 422,
                'errors' => $exception->getMessage(),
            ];

            return $this->json($data, 422);
        }

    }

    /**
     * @param EntityManagerInterface $entityManager
     * @param VideoRepository $videoRepository
     * @param $id
     * @Route("/video/{id}", name="video_delete", methods={"DELETE"})
     * @return JsonResponse
     */
    public function deleteVideo(EntityManagerInterface $entityManager, VideoRepository $videoRepository, $id)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $video = $videoRepository->find($id);

        if (!$video) {
            $data = [
                'status' => 404,
                'errors' => 'Video not found'
            ];

            return $this->json($data, 404);
        }

        $entityManager->remove($video);
        $entityManager->flush();

        $data = [
            'status' => 200,
            'errors' => "Video deleted successfully",
        ];

        return $this->json($data);
    }

    /**
     * @param Request $request
     * @return Request
     */
    protected function transformRequestBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }
}
