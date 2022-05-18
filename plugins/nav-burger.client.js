/**
 * Enables Navbar Toggle on mobile devices
 */

console.log('initNavbarBurger()')

document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

	$navbarBurgers.forEach((el) => {
		el.addEventListener('click', () => {
			const target = el.dataset.target
			const $target = document.getElementById(target)

			el.classList.toggle('is-active')
			$target.classList.toggle('is-active')
		})
	})
})
