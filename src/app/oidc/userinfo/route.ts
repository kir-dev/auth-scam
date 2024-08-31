import { Profile } from '@/profile';

export function GET(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (!authorization) return new Response('Unauthorized', { status: 401 });

  const token = authorization.split(' ')[1];

  const profile = Profile.fromString(token);
  return Response.json(profile.data);
}
