<?php


namespace App\OEmbed\Client;


use App\OEmbed\Provider\ProviderInterface;

trait resolveOEmbedUrlTrait
{
    private function resolveOEmbedUrl(ProviderInterface $provider, string $mediaId, array $parameters)
    {
        $mediaUrl = str_replace('$ID$', $mediaId, $provider->getUrlScheme());

        $mediaUrlHasQueryString = (bool)parse_url($mediaUrl, PHP_URL_QUERY);
        $queryStingPrefix = ($mediaUrlHasQueryString) ? '&' : '?';

        $queryStringSuffix = (!empty($parameters)) ? $queryStingPrefix . http_build_query($parameters) : '';
        return sprintf(
            '%s?url=%s%s',
            $provider->getApiEndpoint(),
            $mediaUrl,
            rawurlencode($queryStringSuffix)
        );
    }
}