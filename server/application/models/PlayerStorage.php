<?php

use Application\Interfaces\PlayerInterface;

defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @property \CI_DB $db
 * @property \CI_Loader $load
 */
class PlayerStorage extends \CI_Model implements PlayerInterface
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/**
	 * @return int id
	 */
	public function createPlayer(string $sessionId): int
	{
		$this->db->insert('players', [
			'session_id' => $sessionId,
			'balance' => 1000,
			'total_bets' => 0,
			'total_wins' => 0,
			'total_spins' => 0,
			'winning_spins' => 0
		]);
		return $this->db->insert_id();
	}

	public function deletePlayer(string $sessionId): void
	{
		$this->db->delete('players', ['session_id' => $sessionId]);
	}

	public function findPlayerBySession(string $sessionId): ?int
	{
		$result = $this->db
			->get_where('players', ['session_id' => $sessionId])
			->row();
		return $result ? $result->id : null;
	}

	public function logSpin(float $bet, float $win, int $player_id)
	{
		$this->db->set('total_bets', 'total_bets + ' . $bet, FALSE);
		$this->db->set('total_wins', 'total_wins + ' . $win, FALSE);
		$this->db->set('total_spins', 'total_spins + 1', FALSE);
		if ($win > 0) {
			$this->db->set('winning_spins', 'winning_spins + 1', FALSE);
		}
		$this->db->where('id', $player_id);
		$this->db->update('players');
	}

	public function adjustBalance(float $amount, int $player_id)
	{
		$this->db->set('balance', 'balance + ' . $amount, FALSE);
		$this->db->where('id', $player_id);
		$this->db->update('players');
	}

	public function getBalance(int $player_id): float
	{
		$query = $this->db->get_where('players', ['id' => $player_id]);
		$result = $query->row();
		return $result ? $result->balance : 1000.00;
	}

	public function getRTP(int $player_id): float
	{
		$query = $this->db->select('total_bets, total_wins')
			->where('id', $player_id)
			->get('players');
		$data = $query->row();
		return ($data && $data->total_bets > 0) ? ($data->total_wins / $data->total_bets) * 100 : 0;
	}

	public function getHitFrequency(int $player_id): float
	{
		$query = $this->db->select('total_spins, winning_spins')
			->where('id', $player_id)
			->get('players');
		$data = $query->row();
		return ($data && $data->total_spins > 0) ? ($data->winning_spins / $data->total_spins) * 100 : 0;
	}
}
