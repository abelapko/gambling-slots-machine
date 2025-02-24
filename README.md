# Gambling Slots Machine (casino)

## About

This project is a server-side implementation of the "Burning Love" slot machine game, inspired by the original version from [booming-games.com](https://booming-games.com). It replicates the game’s mechanics, including spins, winning lines, and balance management, without bonus rounds or free spins.

---

## Demo

<video width="640" controls autoplay loop>
  <source src="docs/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Requirements

To run the project, ensure you have the following installed:

- **[GIT](https://git-scm.com/)**
- **[Docker](https://www.docker.com/)**
- **[Docker Compose](https://docs.docker.com/compose/)**
- **[Make](https://www.gnu.org/software/make/)**

---

## Install

1. Clone the repository:
```sh
git clone https://github.com/abelapko/gambling-slots-machine.git
cd gambling-slots-machine
```

2. Setup app:
```sh
make init
```

---

## User Guide

Open in browser http://localhost:8000

---

## Future Improvements

- Add tests via [PHPUnit](https://phpunit.de/index.html) for business logic models
- Integrate [PHP CS Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) and [PHPStan](https://phpstan.org/)
