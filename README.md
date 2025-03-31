NOTE FOR MENTOR REVIEWING: Feedback can be done in English and/or Dutch! No preference!

- npm run dev to run the website.
- command line to event directory and json-server events.json to start up the event server.

Updates/fixes:
- Updated main.css to fix the horizontal scroll bar on the homepage. This was a small issue on responsiveness.
- Updated main.css to fix the header on the homepage becoming wonky on smaller screens. It works accordingly for screens >400px. Lower sizes creates a black space on the bottom that I can look into to fix properly in the future.
- Updated main.css and EventsPage.jsx to fix the aspect ratios of event images.

  
To be done in future and Nice to Haves feedback:
- Responsive styling for the event box border is a bit awkward -> styling issue.
- When event box has less than 6 events listed, the event frame stretches over the space -> styling issue.
- Events on the events page (homepage) have the same background color as the website itself, causing events to blend with the background color depending on the scroll position. This can be solved using a different background color for events themselves, or adding a border to the events container -> styling issue.
- Button color fade when hovering over is a bit weird. Buttons also remain highlighted after clicked, causing readability issues -> styling issue.
- Buttons are rather small, could be resized for better readability in general.
- When sorting events by category after adding or removing an event, the block element turns black and not show the corresponding events. Refreshing the page solves it -> probably a delay in loading the updated event data.
- Code may have some traces left of unused code/removed code after trying to solve several issues. A proper code cleanup will be done later.
