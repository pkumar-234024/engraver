import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SiteConfig {
  name: string;
  tagline: string;
  logoText: string;
  contact: {
    phone: string;
    alternatePhone: string;
    email: string;
    address: string;
    workingHours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const initialState: SiteConfig = {
  name: "Engraver",
  tagline: "Precision laser engraving and custom designs for professional results.",
  logoText: "Engraver",
  contact: {
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    email: "info@engraverpro.com",
    address: "123 Precision Way, Craft City, ST 12345",
    workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
  social: {
    facebook: "https://facebook.com/engraverpro",
    instagram: "https://instagram.com/engraverpro",
    twitter: "https://twitter.com/engraverpro",
  },
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    updateSiteConfig: (state, action: PayloadAction<Partial<SiteConfig>>) => {
      return { ...state, ...action.payload };
    },
    updateContact: (state, action: PayloadAction<Partial<SiteConfig['contact']>>) => {
      state.contact = { ...state.contact, ...action.payload };
    },
    updateSocial: (state, action: PayloadAction<Partial<SiteConfig['social']>>) => {
      state.social = { ...state.social, ...action.payload };
    }
  },
});

export const { updateSiteConfig, updateContact, updateSocial } = siteSlice.actions;
export default siteSlice.reducer;
