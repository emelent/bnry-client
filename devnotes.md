# My thought process during this thing

### Goal 1,
	Get the simplest version of the component, that is, get it displaying images
	and sliding things around.

	This is a multi-step part:
		1. Component renders images (done)
		2. Component can go to next and previous image (done)
		3. Component infinitely scrolls (done)
		4. Add some animations (done)

### Goal 2
	Test the component, check that the state changes when buttons are clicked,
	that way the tests depend on state not necessarily the Component being rendered
	by the slider.

	i.e. Just check that the state goes to the next item when next is clicked, etc.

### Goal 3
	Get the component to be responsive, make it appropriate for phones, tablets and
	desktops.

	i.e. 
		- Phone, go full nearly fullscreen
		- Tablet, go full width with height cap
		- Desktop, capped width, and height


### Goal 4
	Make things more reusable, I'm thinking have the slider take in a component
	to render and pass the data to an instance of that component.

	So basically, you can now slide between any component.
	Which means you can just as easily create a Video component and slide between videos,
	or an Audio component and slide between Audios, or heck, a Pdf document and slide between
	documents.


### Goal 5
	Client is done, setup le Node Server


### Le Bonus, Hook the ting up
	Method 1:
		Periodically poll the server for an update, yep, do the Redux tings

	Method 2:
		Set up a websocket on the server so the client gets immediately notified of db changes
		and reacts accordingly.


### Polish the tings

	Make it look super cool... or something