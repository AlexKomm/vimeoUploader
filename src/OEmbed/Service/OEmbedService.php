<?php


namespace App\OEmbed\Service;


use App\OEmbed\Client\ClientInterface;
use App\OEmbed\Exception\OEmbedProviderNotFoundException;
use App\OEmbed\Provider\ProviderFactory;

class OEmbedService
{
    /**
     * @var ClientInterface
     */
    private $client;
    /**
     * @var ProviderFactory
     */
    private $providerFactory;


    /**
     * OEmbedService constructor.
     *
     * @param ClientInterface $client
     * @param ProviderFactory $providerFactory
     */
    public function __construct(ClientInterface $client, ProviderFactory $providerFactory)
    {
        $this->client = $client;
        $this->providerFactory = $providerFactory;
    }

    public function fetchOEmbed($mediaId, $provider)
    {
        try {
            $provider = $this->providerFactory->fetchProvider($provider);
            return $this->client->fetchEmbed($provider, $mediaId);
        }
        catch (OEmbedProviderNotFoundException $exception) {
            return [];
        }
    }

}