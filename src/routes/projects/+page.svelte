<main class="text-text p-8">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-[20vh] max-w-screen-lg mx-auto">

		<!-- Project 1 -->
		<div class="flex flex-col items-start space-y-3 max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
			<a href="https://github.com/Zelvios/todo-tui" target="_blank">
				<img src="src/lib/images/todo-tui.png" alt="no image" class="project-image w-full h-40 object-cover rounded-t-lg transition-all duration-300">
			</a>
			<h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
				<span>Todo-TUI</span>
				<span class="line"></span>
			</h2>
			<p class="text-xs text-left w-full">
				<a href="https://www.rust-lang.org/" target="_blank" class="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md hover:text-accent hover:bg-gray-600 transition-colors">
					Rust
				</a>
				<a href="https://ratatui.rs/" target="_blank" class="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md ml-1 hover:text-accent hover:bg-gray-600 transition-colors">
					Ratatui
				</a>
			</p>
			<p class="text-sm text-text text-left w-full">
				A simple terminal-based To-Do app built in rust using the
				ratatui library for creating a text-based user interface.
			</p>
			<div class="flex items-center space-x-2 mt-4 w-full">
				<a href="https://github.com/Zelvios/todo-tui" target="_blank" class="text-accent hover:text-accent-dark">
					<img src="src/lib/images/github.svg" alt="GitHub" class="w-5 h-5">
				</a>
				<a href="https://github.com/Zelvios/todo-tui" target="_blank" class="text-sm text-text underline hover:text-accent">
					Source code
				</a>
			</div>
		</div>

		<!-- Project 2 -->
		<div class="flex flex-col items-center space-y-3 max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
			<img src="src/images/project2.jpg" alt="no image" class="w-full h-40 object-cover rounded-t-lg">
			<h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
				<span>Project 2</span>
				<span class="line"></span>
			</h2>
			<p class="text-sm text-text text-left w-full">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet vulputate nibh.
			</p>
		</div>

		<!-- Project 3 -->
		<div class="flex flex-col items-center space-y-3 max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
			<img src="src/images/project3.jpg" alt="no image" class="w-full h-40 object-cover rounded-t-lg">
			<h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
				<span>Project 3</span>
				<span class="line"></span>
			</h2>
			<p class="text-sm text-text text-left w-full">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet vulputate nibh.
			</p>
		</div>
	</div>
</main>

<style>
	.project-image {
		transition: transform 0.3s ease, filter 0.3s ease;
	}

	.project-image:hover {
		transform: scale(1.05);
	}

	h2 .line {
		flex-grow: 1;
		border-bottom: 1.5px solid #c6d0f5;
		margin-left: 8px;
	}
</style>