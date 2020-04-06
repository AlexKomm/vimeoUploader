<?php


namespace App\OEmbed\Client;


use App\OEmbed\Exception\OEmbedUnavailableException;
use App\OEmbed\OEmbedInterface;
use App\OEmbed\Provider\ProviderInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class DefaultClient implements ClientInterface
{
    use resolveOEmbedUrlTrait;

    /**
     * @var \GuzzleHttp\ClientInterface
     */
    private $guzzle;

    /**
     * DefaultClient constructor.
     * @param \GuzzleHttp\ClientInterface $guzzle
     */
    public function __construct(\GuzzleHttp\ClientInterface $guzzle = null)
    {
        $this->guzzle = $guzzle;
    }


    /**
     * @inheritDoc
     */
    public function fetchEmbed(ProviderInterface $provider, string $mediaId, array $parameters = []): array
    {
        $oEmbedUrl = $this->resolveOEmbedUrl($provider, $mediaId, $parameters);

        try {
            $response = $this->getGuzzle()->request('GET', $oEmbedUrl);
        } catch (GuzzleException $e) {
            $response = null;
            $guzzleException = $e;
        } catch (\Exception $e) {
            $response = null;
        } catch (\Throwable $e) {
            $response = null;
        }

        if (!$response || $response->getStatusCode() != 200) {
            throw new OEmbedUnavailableException(
                sprintf(
                    'Trying to get the embed code for media ID %s from provider "%s" failed.',
                    $mediaId,
                    $provider->getName()
                ),
                0,
                (isset($guzzleException)) ? $guzzleException : null);
        }

        return json_decode($response->getBody(), true);
    }

    private function getGuzzle(): \GuzzleHttp\ClientInterface
    {
        if (null === $this->guzzle) {
            $this->guzzle = new Client([
                'defaults' => [
                    'connect_timeout' => 5,
                    'timeout' => 5,
                ]
            ]);
        }

        return $this->guzzle;
    }
}