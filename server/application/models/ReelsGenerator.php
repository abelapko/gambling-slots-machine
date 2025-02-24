<?php

namespace Application\Models;

use PlayerStorage;

class ReelsGenerator
{
	private array $symbolWeights;
	private float $targetRTP;
	private float $targetHitFrequency;
	private int $reelsCount;
	private int $rowsCount;
	private PlayerStorage $playerStorage;
	private int $playerId;

	public function __construct(
		array         $symbolWeights,
		float         $targetRTP,
		float         $targetHitFrequency,
		int           $reelsCount,
		int           $rowsCount,
		PlayerStorage $playerStorage,
		int           $playerId
	)
	{
		$this->symbolWeights = $symbolWeights;
		$this->targetRTP = $targetRTP;
		$this->targetHitFrequency = $targetHitFrequency;
		$this->reelsCount = $reelsCount;
		$this->rowsCount = $rowsCount;
		$this->playerStorage = $playerStorage;
		$this->playerId = $playerId;
	}

	public function generateReels(): array
	{
		$adjustedWeights = $this->adjustSymbolWeights();
		$reels = [];

		for ($i = 0; $i < $this->reelsCount; $i++) {
			$reels[$i] = array_map(fn() => $this->getRandomSymbol($adjustedWeights), range(0, $this->rowsCount - 1));
		}

		return $reels;
	}

	private function adjustSymbolWeights(): array
	{
		$currentRTP = $this->playerStorage->getRTP($this->playerId);
		$currentHitFrequency = $this->playerStorage->getHitFrequency($this->playerId);

		return array_map(
			fn($weight) => max(1, $weight - round(($currentRTP - $this->targetRTP) / 10) - round(($currentHitFrequency - $this->targetHitFrequency) / 10)),
			$this->symbolWeights
		);
	}

	private function getRandomSymbol(array $weights): string
	{
		$totalWeight = array_sum($weights);
		$rand = mt_rand(1, $totalWeight);

		foreach ($weights as $symbol => $weight) {
			if ($rand <= $weight) {
				return $symbol;
			}
			$rand -= $weight;
		}

		return array_keys($weights)[0];
	}
}
