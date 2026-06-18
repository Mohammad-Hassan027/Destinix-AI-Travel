import { useState, useEffect } from "react";
import * as groupService from "../../services/collaboration/groupService";

export const useGroups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await groupService.listUserGroups();
      setGroups(data);
    } catch (err: any) {
      setError(err.message || "Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (name: string) => {
    try {
      const newGroup = await groupService.createGroup(name);
      // Re-fetch groups to get populated owner/member details
      await fetchGroups();
      return newGroup;
    } catch (err: any) {
      throw new Error(err.message || "Failed to create group");
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      await groupService.deleteGroup(id);
      setGroups(prev => prev.filter(g => g.id !== id));
    } catch (err: any) {
      throw new Error(err.message || "Failed to delete group");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return { groups, loading, error, fetchGroups, createGroup, deleteGroup };
};
