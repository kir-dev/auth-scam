import { Profile } from '@/profile';

export function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const profile = Profile.fromString(query.get('access_token')!);
  return Response.json(profile.data);
}
