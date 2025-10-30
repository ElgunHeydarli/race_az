import { tabs } from '@/data/tabs';
import { create } from 'zustand';

type TabId = 'general' | 'participant' | 'registration' | 'contact';

interface useTabState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const useTab = create<useTabState>((set) => ({
  activeTab: tabs[0].id as TabId,
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}));

