<?php

namespace Application\Models;

use PlayerStorage;

class GameManager
{
	private PlayerStorage $playerStorage;
	private ReelsGenerator $reelsGenerator;
	private WinningCalculator $winningCalculator;
	private int $playerId;

	public function __construct(
		PlayerStorage     $playerStorage,
		ReelsGenerator    $reelsGenerator,
		WinningCalculator $winningCalculator,
		int               $playerId
	)
	{
		$this->playerStorage = $playerStorage;
		$this->reelsGenerator = $reelsGenerator;
		$this->winningCalculator = $winningCalculator;
		$this->playerId = $playerId;
	}

	public function playRound(int $activeLines, float $betPerLine): array
	{
		$totalBet = $betPerLine * $activeLines;

		if ($this->playerStorage->getBalance($this->playerId) >= $totalBet) {
			$this->playerStorage->adjustBalance(-$totalBet, $this->playerId);

			$reels = $this->reelsGenerator->generateReels();
			list('win' => $winAmount, 'details' => $details) = $this->winningCalculator->calculateWin($reels, $totalBet, $activeLines);

			$this->playerStorage->adjustBalance($winAmount, $this->playerId);
			$this->playerStorage->logSpin($totalBet, $winAmount, $this->playerId);

			return [
				'reels' => $reels,
				'win' => $winAmount,
				'balance' => $this->playerStorage->getBalance($this->playerId),
				'details' => $details,
			];
		} else {
			throw new \DomainException("Insufficient balance to place bet.");
		}
	}
}
