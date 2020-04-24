# https://actonmass.org

## Content edition

### What to edit

The website content is located in the following directories:
- [`_pages`](/_pages) for general pages
- [`_posts`](/_posts) for blog posts
- [`_issues`](/_issues) for issues
- [`img`](/img) for images and pictures
- [`assets`](/assets) for assets, such as PDF documents

### Syntax

Page and posts content is written in [Markdown](https://www.markdownguide.org/basic-syntax/).

On top of each page file, a "front matter" can also be found. It defines metadata about the page using the [YAML](https://lzone.de/cheat-sheet/YAML) format.

### Styling in Markdown

While most page styling happens in CSS and templates, some basic pre-made styles can be added to style a paragraph.

For instance, to apply the style `centered` to a paragraph, use the following syntax:

```
Text to center
{: .centered }
```

Several styles can be added on the same paragraph:

```
Important text to center
{: .centered .important }
```

The following styles are available:

- `centered`: Center a paragraph
- `small`: Use a smaller font size for text in the paragraph.
- `important`: Use a bigger font size for text in the paragraph.
- `centered-image`: Center an image and its legend.
- `small-image`: Ensure that image height won't be more than 400px.

More styles can be built if necessary.

### Including reusable components

Some pre-mades components can be added to a page or a post.

- Include a Youtube video:
  ```
  {% include youtube-video.html src="https://www.youtube.com/embed/VIDEO_ID" %}
  ```
- Include the sign-up form:
  ```
  {% include signup-form.html %}
  ```



## Style edition

Pages layout (HTML and CSS) can be edited in the following places:
- [`_layouts`](/_layouts) for page layouts
- [`blog/index.html`](/blog/index.html) for the [/blog](https://actonmass.org/blog/) page layout
- [`css`](/css) for CSS stylesheets


## Live deployment

All branches (draft versions of the website) are automatically deployed to preview changes. A branch named `test` would be deployed on the domain https://test--actonmass.netlify.com/.

Branch deployment should not take more than 2 minutes.
If a deployment doesn't work, logs can be checked on [Netlify](https://app.netlify.com/sites/actonmass/deploys) (requires login).


# Development #

To build and serve locally
```
npm install
npm run dev
```

