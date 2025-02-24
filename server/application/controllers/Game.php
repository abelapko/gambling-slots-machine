<?php

use Application\Models\GameManager;
use Application\Models\ReelsGenerator;
use Application\Models\WinningCalculator;

defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @property-read CI_Form_validation $form_validation;
 * @property-read CI_Input $input;
 * @property-read CI_Session $session;
 * @property-read \PlayerStorage $PlayerStorage;
 */
class Game extends CI_Controller
{
	private GameManager $gameManager;
	private int $playerId;

	public function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->model('PlayerStorage');
		$this->load->library('session');

		$config = require APPPATH . '/config/game.php';

		$playerId = $this->PlayerStorage->findPlayerBySession(
			session_id()
		);
		if (!$playerId) {
			$playerId = $this->PlayerStorage->createPlayer(session_id());
		}

		$this->playerId = $playerId;

		$reelsGenerator = new ReelsGenerator(
			$config['SYMBOL_WEIGHTS'],
			$config['RTP'],
			$config['HIT_FREQUENCY'],
			$config['REELS_COUNT'],
			$config['ROWS_COUNT'],
			$this->PlayerStorage,
			$this->playerId
		);
		$winningCalculator = new WinningCalculator(
			$config['WINNING_LINES'],
			$config['PAYTABLE']
		);

		$this->gameManager = new GameManager(
			$this->PlayerStorage,
			$reelsGenerator,
			$winningCalculator,
			$this->playerId
		);
	}

	public function spid()
	{
		echo '{"reels":[["symbol3","symbol1","symbol4"],["symbol3","symbol1","symbol1"],["symbol3","symbol1","symbol4"],["symbol4","symbol1","symbol4"],["symbol2","symbol1","symbol2"]],"win":170,"balance":1070,"details":[{"Line":0,"Symbol":"symbol1","Matches":5,"Win":100},{"Line":1,"Symbol":"symbol3","Matches":3,"Win":50},{"Line":6,"Symbol":"symbol1","Matches":3,"Win":20}]}';
	}

	public function spin()
	{

		$this->form_validation->set_rules('bet', 'Bet', 'required|integer|greater_than[0]');
		$this->form_validation->set_rules('lines', 'Lines', 'required|integer|greater_than[0]|less_than_equal_to[20]');

		if ($this->form_validation->run() == FALSE) {
			echo json_encode(["error" => validation_errors()]);
			return;
		}

		$bet = $this->input->post('bet');
		$lines = $this->input->post('lines');

		$result = $this->gameManager->playRound($lines, $bet);
		echo json_encode($result);
	}

	public function balance()
	{
		echo json_encode([
			"balance" => $this->PlayerStorage->getBalance($this->playerId)
		]);
	}

	public function restart(): void
	{
		$this->PlayerStorage->deletePlayer(session_id());
		$this->session->sess_destroy();
	}
}
