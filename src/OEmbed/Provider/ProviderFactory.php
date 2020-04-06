<?php


namespace App\OEmbed\Provider;


use App\OEmbed\Exception\OEmbedProviderNotFoundException;

class ProviderFactory
{

    /**
     * Fetches the provider with the given name. If not found, throws a provider not found exception.
     *
     * @param string $name
     * @return ProviderInterface
     * @throws OEmbedProviderNotFoundException if provider not found.
     **/
    public function fetchProvider(string $name): ProviderInterface
    {
        if ($name == 'vimeo') {
            return new DefaultProvider(
                'vimeo',
                'https://vimeo.com/api/oembed.json',
                'https://vimeo.com/$ID$',
                'html'
            );
        }

        throw new OEmbedProviderNotFoundException();
    }
}