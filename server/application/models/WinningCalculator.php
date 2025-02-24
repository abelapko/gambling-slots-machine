<?php

namespace Application\Models;

class WinningCalculator
{
	private array $winningLines;
	private array $paytable;

	public function __construct(array $winningLines, array $paytable)
	{
		$this->winningLines = $winningLines;
		$this->paytable = $paytable;
	}

	public function calculateWin(array $reels, int $bet, int $activeLines): array
	{
		$totalWin = 0;
		$winDetails = [];

		foreach (array_slice($this->winningLines, 0, $activeLines) as $lineIndex => $line) {
			$symbols = array_map(fn($col, $row) => $reels[$col][$row], array_keys($line), $line);
			$symbol = $symbols[0];

			$matchCount = 1;
			for ($i = 1; $i < count($symbols); $i++) {
				if ($symbols[$i] === $symbol) {
					$matchCount++;
				} else {
					break;
				}
			}

			if ($matchCount >= 3) {
				if (!isset($this->paytable[$symbol][$matchCount])) {
					error_log("❌ Ошибка: нет выплаты в paytable для $symbol ($matchCount символов)");
					continue;
				}

				$win = round(($bet / max(1, $activeLines)) * $this->paytable[$symbol][$matchCount], 2);
				$totalWin += $win;
				$winDetails[] = ["Line" => $lineIndex, "Symbol" => $symbol, "Matches" => $matchCount, "Win" => $win];
			}
		}

		return ['win' => $totalWin, 'details' => $winDetails];
	}

	private function printWinTable(array $winDetails)
	{
		echo "\n| Line | Symbol | Matches | Win Amount |\n";
		echo "|------|--------|---------|------------|\n";
		foreach ($winDetails as $detail) {
			echo "| " . $detail['Line'] . " | " . $detail['Symbol'] . " | " . $detail['Matches'] . " | " . $detail['Win'] . " |\n";
		}
	}
}
