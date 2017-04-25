+++
date = "2017-04-19T16:15:24-05:00"
draft = false
title = "aside"

+++

The aside element allows you to push any content to the left or right of the text body. The width depends on the device and width of the screen. At a breakpoint for the iPad in portrait mode, the aside will stop wrapping around text and instead push it down.

<h2 class="light">example</h2>

```
<aside>
  <figure>
    <img src="/sample/yordano.jpg">
    <figcaption>Caption for the image can go here</figcaption>
  </figure>
</aside>
```

<h2 class="light">result</h2>

<aside class="space">
  <figure style="margin-top: 1rem;">
    <img src="/sample/yordano.jpg">
    <figcaption>Caption for the image can go here</figcaption>
  </figure>
</aside>

Any HTML content can be pushed to the left or right of the story body by placing it in an aside element. This is a different approach from previous versions of our components, where each element had it's own code to handle the change. 

The downside is that in order to push content left or right you need to edit the html directly, but the advantage of being able to push anything is worth it. 

<h2 class="light clear">usage</h2>

In order to use the aside element, wrap any HTML with the `<aside></aside>` tags like the example above. A figure or blockquote is a common example, but it can be anything.

By default, the content will be pushed to the left of the story body. You can move it to the right by adding a class attribute to the tag like so: `<aside class="right"></aside>`.
