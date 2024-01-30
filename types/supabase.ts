export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      amenities: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      amenity_listing: {
        Row: {
          amenity: string | null
          created_at: string | null
          id: string
          listing: string | null
        }
        Insert: {
          amenity?: string | null
          created_at?: string | null
          id?: string
          listing?: string | null
        }
        Update: {
          amenity?: string | null
          created_at?: string | null
          id?: string
          listing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "amenity_listing_amenity_fkey"
            columns: ["amenity"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amenity_listing_listing_fkey"
            columns: ["listing"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          about: string | null
          avatar_url: string | null
          created_at: string | null
          id: string
          industry: string | null
          name: string | null
          score: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          name?: string | null
          score?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          name?: string | null
          score?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_industry_fkey"
            columns: ["industry"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          score: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          score?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          score?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
        ]
      }
      files: {
        Row: {
          archived: boolean | null
          created_at: string | null
          download_url: string | null
          folder: string | null
          id: string
          name: string | null
          path: string | null
          profile: string | null
          size: number | null
          thumbnail: string | null
          type: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          download_url?: string | null
          folder?: string | null
          id?: string
          name?: string | null
          path?: string | null
          profile?: string | null
          size?: number | null
          thumbnail?: string | null
          type?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          download_url?: string | null
          folder?: string | null
          id?: string
          name?: string | null
          path?: string | null
          profile?: string | null
          size?: number | null
          thumbnail?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      folders: {
        Row: {
          archived: boolean | null
          created_at: string | null
          id: string
          name: string | null
          parent: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          id?: string
          name?: string | null
          parent?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          id?: string
          name?: string | null
          parent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          }
        ]
      }
      industries: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      listing_company: {
        Row: {
          company: string | null
          created_at: string | null
          favorite: boolean
          id: string
          listing: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          favorite?: boolean
          id?: string
          listing?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          favorite?: boolean
          id?: string
          listing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_company_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_company_listing_fkey"
            columns: ["listing"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
      }
      listing_photos: {
        Row: {
          created_at: string
          id: string
          listing: string | null
          uploaded_by: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          listing?: string | null
          uploaded_by?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          listing?: string | null
          uploaded_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_photos_listing_fkey"
            columns: ["listing"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_photos_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      listings: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          id: string
          max_price: number | null
          min_price: number | null
          name: string | null
          price: number | null
          region: string | null
          square_feet: number | null
          status: Database["public"]["Enums"]["listing_status"] | null
          type: string | null
          updated_at: string | null
          year_built: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          max_price?: number | null
          min_price?: number | null
          name?: string | null
          price?: number | null
          region?: string | null
          square_feet?: number | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          type?: string | null
          updated_at?: string | null
          year_built?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          max_price?: number | null
          min_price?: number | null
          name?: string | null
          price?: number | null
          region?: string | null
          square_feet?: number | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          type?: string | null
          updated_at?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          author: string | null
          company: string | null
          contact: string | null
          content: string | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          company?: string | null
          contact?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          company?: string | null
          contact?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
      pending_invites: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          invited_by: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_invites_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_invites_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      tag_relationships: {
        Row: {
          company: string | null
          contact: string | null
          created_at: string | null
          id: string
          note: string | null
          tag: string | null
        }
        Insert: {
          company?: string | null
          contact?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          tag?: string | null
        }
        Update: {
          company?: string | null
          contact?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_relationships_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_relationships_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_relationships_note_fkey"
            columns: ["note"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_relationships_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      listing_status: "Active" | "Inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
