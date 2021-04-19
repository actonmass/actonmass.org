# https://actonmass.org

## Content edition

Most content can be edited via the https://actonmass.org/admin/ admin UI.

It can also be edited directly here in the [content](./content) directorory.

### Syntax

Page and posts content are written in [Markdown](https://www.markdownguide.org/basic-syntax/).

In addition to standard markdown features, you can use custom tags to format a page.

Some examples:

```jsx

<HubspotForm portalId="6201350" formId="fd6d4250-b852-453a-922e-705e792f4167" />

<Button href="https://some.meeting.zoom.us">
  Sign-up for an event!
</Button>

<CenteredBlock>
  # A centered title
</CenteredBlock>


<CenteredImage img="/img/some-image.jpg" alt="Image description for accessibility" width="500"/>

<Section color="light-blue" width="1000">

  ## A title

  In November of 2020, Act on Mass launched our Transparency is Power campaign. Between
  November and February, over 3000 constituents...

</Section>

```
