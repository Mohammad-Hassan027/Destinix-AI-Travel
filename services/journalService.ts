import { TripJournal } from '../types';

export const getPublicJournals = async (): Promise<TripJournal[]> => {
  const res = await fetch('/api/journals');
  if (!res.ok) throw new Error('Failed to fetch public journals');
  return res.json();
};

export const getUserJournals = async (userId: string): Promise<TripJournal[]> => {
  const res = await fetch(`/api/journals/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user journals');
  return res.json();
};

export const getJournal = async (id: string): Promise<TripJournal> => {
  const res = await fetch(`/api/journals/${id}`);
  if (!res.ok) throw new Error('Failed to fetch journal');
  return res.json();
};

export const createJournal = async (
  data: Pick<TripJournal, 'userId' | 'title' | 'content' | 'coverImage' | 'isPublic'>
): Promise<TripJournal> => {
  const res = await fetch('/api/journals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create journal');
  return res.json();
};

export const updateJournal = async (
  id: string,
  userId: string,
  data: Partial<Pick<TripJournal, 'title' | 'content' | 'coverImage' | 'isPublic'>>
): Promise<TripJournal> => {
  const res = await fetch(`/api/journals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, userId }),
  });
  if (!res.ok) throw new Error('Failed to update journal');
  return res.json();
};

export const deleteJournal = async (id: string, userId: string): Promise<void> => {
  const res = await fetch(`/api/journals/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error('Failed to delete journal');
};
