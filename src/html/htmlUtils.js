// Shared utility functions for the various HTML pages' logic
import { shufflingHints } from "../config.js";

// ---------- Public ----------
// ----- Shuffling Hints -----
export async function displayShufflingHint(displayElement, currentHintIndex = null) {
	// Choose a (new) random hint from the JSON file and display it
	let randomHintIndex = currentHintIndex;
	while (randomHintIndex === currentHintIndex) {
		randomHintIndex = Math.floor(Math.random() * shufflingHints.length);
	}

	displayElement.innerText = shufflingHints[randomHintIndex];

	return randomHintIndex;
}

// ----- Other utility functions -----
export async function tryFocusingTab(tabUrl) {
	let mustOpenTab = true;
	let tabs = await chrome.tabs.query({});
	for (let i = 0; i <= tabs.length - 1; i++) {
		if (tabs[i].url === tabUrl) {
			// An instance of the page already exists, so don't create a new one
			mustOpenTab = false;
			// Focus the existing tab
			chrome.tabs.update(tabs[i].id, { active: true });
			break;
		}
	}
	return mustOpenTab;
}