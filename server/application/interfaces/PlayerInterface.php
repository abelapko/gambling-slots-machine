<?php

namespace Application\Interfaces;

interface PlayerInterface
{

	public function findPlayerBySession(string $sessionId): ?int;

	public function logSpin(float $bet, float $win, int $player_id);

	public function adjustBalance(float $amount, int $player_id);

	public function getBalance(int $player_id): float;

	public function getRTP(int $player_id): float;

	public function getHitFrequency(int $player_id): float;
}
