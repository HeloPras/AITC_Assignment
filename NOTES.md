
# Part 1

1. We get a peek of cards inside the carousel before hydration. 
2. After hydration when the useEffect (inside ProductCarousel) triggers, carousel doesn't work doesn't work as intended
	- The last card remains slightly visible.
	- The preceding cards become progressively less visible (their opacity decreases from the last card to the first).
    - Cards appear shifterd outside carousel towards left side and overflowing vertically.

The likely cause of jank on the lower-end device:
 1. Use of left and top
    Forces the browser to recalculate layout every frame causing more load to cpu.  While other property  doesn't changes the element layout, skipping layout recalculation and painting. 
 2. onUpdate and .offsetTop
    Are not required in our cases but is in use, causing unnecessary load (recalculation of card position from top every frame) to our browser.            

 To verify this in Chrome DevTools: 
 - **Performance** panel: Set CPU to mid-tier mobile, record the animation and look for frequent Layout and Paint events during each frame. After optimization, most frames should consist mainly of Composite Layers with fewer layout and scripting events. 


# Part 3

## Bug 1 – Entrance animation and card positioning

The carousel was briefly rendered in its final HTML state before the GSAP animation was initialized, causing users to see a flash of the cards before hydration. After `useEffect` ran, the animation started from an incorrect initial state, leaving the last card partially visible, reducing the opacity of preceding cards, and shifting cards outside the carousel. The fix ensures the correct initial styles are applied before the animation begins so the entrance sequence starts from a consistent state.

## Bug 2 – React Strict Mode initialization

The carousel did not initialize correctly in development because React Strict Mode mounts, unmounts, and mounts components again to detect side effects. Since the animation was not fully cleaned up between mounts, stale animation state persisted and caused the carousel to behave incorrectly after reinitialization. Proper cleanup ensures each mount starts from a clean state, resulting in consistent behavior.
## Bug 3 – Animation jank on lower-end devices

The animation was updating the `top` and `left` properties and reading `offsetTop` inside the `onUpdate` callback. Updating layout-affecting properties and forcing layout reads on every animation frame caused unnecessary layout recalculations and increased CPU usage. The fix replaces layout-based positioning with `transform`-based animations and removes the unnecessary layout reads, reducing main-thread work and resulting in smoother animations.
