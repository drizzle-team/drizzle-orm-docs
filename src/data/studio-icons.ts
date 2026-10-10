/** Shared between the landing page tabs and the Studio overview table. */
export const studioIcons = {
  local: 'M4 17l6-6-6-6M12 19h8',
  gateway: 'M5 5h14v5H5zM5 14h14v5H5zM8 7.5h.01M8 16.5h.01',
  extension: 'M4 7h16v12H4zM4 7l0-2h16v2M7 5.5h.01M9.5 5.5h.01',
  component: 'M8 6l-6 6 6 6M16 6l6 6-6 6',
  desktop: 'M3 5h18v11H3zM8 20h8M12 16v4',
} as const;

export type StudioIconName = keyof typeof studioIcons;
