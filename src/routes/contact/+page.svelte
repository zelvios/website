<main class="text-text p-6">
	<div class="flex flex-col items-center justify-center space-y-6 mt-[20vh] max-w-lg mx-auto fade-in">
		<h1 class="text-3xl font-bold text-accent text-center">Contact</h1>
		<p class="text-base text-text text-center">
			Feel free to reach out to me through any of the channels below.
		</p>
	</div>

	<!-- Socials Section -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 max-w-lg mx-auto fade-in">

		<!-- Mail -->
		<div class="flex flex-col items-center space-y-3">
			<h2 class="text-lg font-semibold text-accent text-center">Mail</h2>
			<p class="text-sm text-text text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg whitespace-nowrap">
				<a href="mailto:contact@jacob-j.com?subject=Hello Jacob&body=Hi Jacob,%0A%0A" class="text-text underline hover:text-accent">
					contact@jacob-j.com
				</a>
			</p>
		</div>

		<!-- GitHub -->
		<div class="flex flex-col items-center space-y-3">
			<h2 class="text-lg font-semibold text-accent text-center">GitHub</h2>
			<p class="text-sm text-text text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
				<a href="https://github.com/Zelvios" class="text-text underline hover:text-accent">Zelvios</a>
			</p>
		</div>

		<!-- LinkedIn -->
		<div class="flex flex-col items-center space-y-3">
			<h2 class="text-lg font-semibold text-accent text-center">LinkedIn</h2>
			<p class="text-sm text-text text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
				<a href="https://www.linkedin.com/in/jacob-j-in/" class="text-text underline hover:text-accent">Jacob Jørgensen</a>
			</p>
		</div>
	</div>
</main>

<style>
	.fade-in {
		animation: fadeIn 1s ease-out;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
