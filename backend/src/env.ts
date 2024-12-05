import z from 'zod';

export const JWT_SECRET = z.string().parse(process.env.JWT_SECRET);
export const DEFAULT_OWNER_ADDRESS =
  'BZZZLgmEFy3DLyriirKd2tQ8h1fet5ukY3Ea9EQwW3Lo';
