# BNRY ReactJS Slider

Feature List
	- At least 5 images with descriptions, stored on the server, and served using node.(done)
	- Next and previous buttons with a tooltip message indicating which slide is next (kinda)
	- A description below the image.(done)
	- A click event on the 1st half or 2nd half of the image that should serve as ‘next’ and
		‘previous’ buttons (e.g. Clicking on it will take you to the next or previous slide). (done)
	- There should be a transition effect when clicking a next/previous slide. The new slide
		should slide in and the old one slide out simultaneously. (done)
	- Automated tests should be written to cover functionality that you feel should be covered.(done)
	- Thought should be given to responsive design.(done)

BONUS:
	Changes to images or descriptions on the server propagate to the browser without the user needing to refresh the page.(done)


## My thought process during this thing

### Goal 1 (done)
	Get the simplest version of the component, that is, get it displaying images
	and sliding things around.

	This is a multi-step part:
		1. Component renders images (done)
		2. Component can go to next and previous image (done)
		3. Component infinitely scrolls (done)
		4. Add some animations (done)

### Goal 2 (done)
	Test the component, check that the state changes when buttons are clicked,
	that way the tests depend on state not necessarily the Component being rendered
	by the slider.

	i.e. Just check that the state goes to the next item when next is clicked, etc.

	Okay, so next is to check that the props passed to the child components
	match what we expect.

	Since the Slider needs a Component to render to, we'll use a FakeComponent
	that will make use of the data.


### Goal 3 (done)
	Make things more reusable, I'm thinking have the slider take in a component
	to render and pass the data to an instance of that component.

	So basically, you can now slide between any component.
	Which means you can just as easily create a Video component and slide between videos,
	or an Audio component and slide between Audios, or heck, a Pdf document and slide between documents.


### Goal 4 (done)
	Get the component to be responsive, make it appropriate for phones, tablets and desktops.

	i.e. 
		- Phone, go full nearly fullscreen
		- Tablet, go full width with height cap
		- Desktop, capped width, and height

		turns out i could just use the same height cap for all of them

### Goal 5 (done)
	Setup le Node Server



### Le Bonus, Hook the ting up (done)
	Method 1:
		Periodically poll the server for an update, yep, do the Redux tings

	Method 2: 
		Set up a websocket on the server so the client gets immediately notified of db changes
		and reacts accordingly.
	
	Used method2


### Clean up the code (done)
	Things are probably a mess at this point, time to re-evaluate code decisions and clean up
	the dirties.

### Polish the tings (done)

	Make it look super cool... or something