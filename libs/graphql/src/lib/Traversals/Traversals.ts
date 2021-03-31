export const DEVICE_MEDIATOR_TRAVERSAL = {
  edge: {
    type: 'accessible_by',
    direction: 'OUT',
  },
};

export const DEVICE_CONNECTED_PLACES_TRAVERSAL = {
  walk: {
    path: [
      {
        step: {
          existsNow: {},
          type: 'installed_at',
          direction: 'OUT',
        },
      },
      {
        follow: {
          maxDepth: 20,
          edge: { type: 'feed_from', direction: 'OUT' },
        },
      },
    ],
  },
};

export const DEVICE_INSTALLATION_PLACE_TRAVERSAL = {
  walk: {
    path: [
      {
        step: {
          existsNow: {},
          type: 'installed_at',
          direction: 'OUT',
        },
      },
      {
        step: {
          type: 'feed_from',
          direction: 'OUT',
        },
      },
    ],
  },
};

export const DEVICE_MEDIATOR_DTS_TRAVERSAL = {
  walk: {
    path: [
      {
        step: {
          existsNow: {},
          type: 'accessible_by',
          direction: 'OUT',
        },
      },
      {
        follow: {
          maxDepth: 2,
          edge: { existsNow: {}, type: 'installed_at', direction: 'OUT' },
        },
      },
      {
        step: {
          type: 'feed_from',
          direction: 'OUT',
        },
      },
    ],
  },
};

export const INSTALLED_AT_TRAVERSAL = {
  walk: {
    path: [
      {
        step: {
          existsNow: {},
          direction: 'OUT',
          type: 'installed_at',
        },
      },
      {
        follow: {
          edge: { existsNow: {}, type: 'feed_from', direction: 'OUT' },
          maxDepth: 10,
        },
      },
    ],
  },
};
