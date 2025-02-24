<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * @property CI_DB_forge $dbforge
 */
class Migration_Create_players_table extends CI_Migration {

	public function up() {
		$this->dbforge->add_field([
			'id' => [
				'type' => 'INT',
				'constraint' => 11,
				'unsigned' => TRUE,
				'auto_increment' => TRUE
			],
			'session_id' => [
				'type' => 'VARCHAR',
				'constraint' => 128,
				'unique' => TRUE,
				'null' => FALSE
			],
			'balance' => [
				'type' => 'FLOAT',
				'default' => 2000.00
			],
			'total_bets' => [
				'type' => 'FLOAT',
				'default' => 0
			],
			'total_wins' => [
				'type' => 'FLOAT',
				'default' => 0
			],
			'total_spins' => [
				'type' => 'INT',
				'default' => 0
			],
			'winning_spins' => [
				'type' => 'INT',
				'default' => 0
			],
		]);

		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->add_key('session_id', TRUE);
		$this->dbforge->create_table('players');
	}

	public function down() {
		$this->dbforge->drop_table('players');
	}
}
