<?php

namespace App\OEmbed\Provider;

interface ProviderInterface
{
    /**
     * {@inheritdoc}
     **/
    public function getApiEndpoint();

    /**
     * {@inheritdoc}
     **/
    public function getUrlScheme();

    /**
     * {@inheritdoc}
     **/
    public function getEmbedCodeProperty();

    /**
     * {@inheritdoc}
     **/
    public function getName();
}