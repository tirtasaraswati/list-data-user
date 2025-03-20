import { User } from './user.model';

export const DEFAULT_USER: User = {
  id: 0,
  name: '-',
  username: '-',
  email: '-',
  phone: '-',
  website: '-',
  address: {
    street: '-',
    suite: '-',
    city: '-',
    zipcode: '-',
    geo: { lat: '0', lng: '0' },
  },
  company: {
    name: '-',
    catchPhrase: '-',
    bs: '-',
  },
};
