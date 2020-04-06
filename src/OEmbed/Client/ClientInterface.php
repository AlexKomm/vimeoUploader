<?php


namespace App\OEmbed\Client;


use App\OEmbed\Exception\OEmbedUnavailableException;
use App\OEmbed\OEmbedInterface;
use App\OEmbed\Provider\ProviderInterface;

interface ClientInterface
{

    /**
     * Fetches an oEmbed instance from the provider.
     *
     * @param  ProviderInterface $provider
     * @param  string            $mediaId
     * @param  array             $parameters
     * @return array
     * @throws OEmbedUnavailableException if oEmbed cannot be resolved
     **/
    public function fetchEmbed(ProviderInterface $provider, string $mediaId, array $parameters = []): array;

}