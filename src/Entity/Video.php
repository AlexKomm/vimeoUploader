<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\VideoRepository")
 */
class Video implements \JsonSerializable
{
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $provider;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $remote_id;

    /**
     * @var array;
     */
    private $oembed;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getProvider(): ?string
    {
        return $this->provider;
    }

    public function setProvider(string $provider): self
    {
        $this->provider = $provider;

        return $this;
    }

    public function getRemoteId(): ?string
    {
        return $this->remote_id;
    }

    public function setRemoteId(string $remote_id): self
    {
        $this->remote_id = $remote_id;

        return $this;
    }

    /**
     * @return array
     */
    public function getOembed()
    {
        return $this->oembed;
    }

    /**
     * @param array $oembed
     */
    public function setOembed($oembed): void
    {
        $this->oembed = $oembed;
    }


    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'description' => $this->getDescription(),
            'provider' => $this->getProvider(),
            'remote_id' => $this->getRemoteId(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
            'oembed' => $this->getOembed(),
        ];
    }
}
