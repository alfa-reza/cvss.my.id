import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const { entry } = context.locals.starlightRoute;
  const hasCustomTitle = entry.data.head.some((tag) => tag.tag === 'title');
  if (hasCustomTitle) return;

  // Use the page title exactly as written in frontmatter instead of letting
  // Starlight append the site name to every <title> tag.
  entry.data.head = [...entry.data.head, { tag: 'title', attrs: {}, content: entry.data.title }];
});
