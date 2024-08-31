'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Profile, ProfileData } from '@/profile';

const predefinedUsers: (ProfileData & { userIndex: string })[] = [
  {
    userIndex: '1',
    displayName: 'John Doe',
    givenName: 'John',
    internal_id: '3f2a8585-c93a-4849-a2f6-716ee925351d',
    mail: 'john@example.com',
  },
  {
    userIndex: '2',
    displayName: 'Jane Smith',
    givenName: 'Jane',
    internal_id: '996bf70c-5638-44cc-8389-2496b2b1d4ae',
    mail: 'jane@example.com',
  },
  {
    userIndex: '3',
    displayName: 'Bob Johnson',
    givenName: 'Bob',
    internal_id: 'b12964ab-bcfd-40f9-8911-d9d779780380',
    mail: 'bob@example.com',
  },
];

export default function Page() {
  const [redirectUri, setRedirectUri] = useState<string>('http://localhost:3000/auth/callback');
  const [formData, setFormData] = useState<ProfileData & { userIndex: string }>({
    userIndex: '',
    displayName: '',
    givenName: '',
    internal_id: '',
    mail: '',
  });
  const [selectedUserIndex, setSelectedUserIndex] = useState<string | null>(null);

  useEffect(() => {
    const uri = new URLSearchParams(window.location.search).get('client_id');
    if (uri) setRedirectUri(uri);
  }, []);

  useEffect(() => {
    if (selectedUserIndex) {
      const selectedUser = predefinedUsers.find((user) => user.userIndex === selectedUserIndex);
      if (selectedUser) {
        setFormData({ ...selectedUser, userIndex: selectedUser.userIndex.toString() });
      }
    }
  }, [selectedUserIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      userIndex: '', // Set userIndex to empty string when any property changes
    }));
    setSelectedUserIndex(null); // Reset selected user when a property is modified
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = new Profile({ ...formData });
    window.location.href = redirectUri + '?code=' + profile.serialize();
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>OAuth2 Authorization</CardTitle>
        <CardDescription>Please provide the following information to authorize the application:</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='redirect'>Redirect</Label>
            <Input
              id='redirect'
              name='redirect'
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              required
              className='w-full'
            />
          </div>
          <hr />
          <div className='space-y-2'>
            <Label htmlFor='userSelect'>Select Predefined User</Label>
            <Select onValueChange={setSelectedUserIndex} value={selectedUserIndex || undefined}>
              <SelectTrigger>
                <SelectValue placeholder='Select a user' />
              </SelectTrigger>
              <SelectContent className='bg-red-500'>
                {predefinedUsers.map((user) => (
                  <SelectItem key={user.userIndex} value={user.userIndex.toString()}>
                    {user.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='userIndex'>User Index (readonly)</Label>
            <Input
              id='userIndex'
              name='userIndex'
              value={formData.userIndex || 'N/A'}
              readOnly
              className='w-full bg-gray-200'
            />
          </div>

          {Object.entries(formData).map(([key, value]) => {
            if (key !== 'userIndex') {
              return (
                <div key={key} className='space-y-2'>
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input id={key} name={key} value={value} onChange={handleInputChange} required className='w-full' />
                </div>
              );
            }
          })}
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button disabled>Save (coming soon)</Button>
        <Button onClick={handleSubmit}>Authorize</Button>
      </CardFooter>
    </Card>
  );
}
