export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            budget_profile: {
                Row: {
                    budget: string | null;
                    created_at: string | null;
                    id: string;
                    profile: string | null;
                    read_only: boolean | null;
                };
                Insert: {
                    budget?: string | null;
                    created_at?: string | null;
                    id?: string;
                    profile?: string | null;
                    read_only?: boolean | null;
                };
                Update: {
                    budget?: string | null;
                    created_at?: string | null;
                    id?: string;
                    profile?: string | null;
                    read_only?: boolean | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "budget_profile_budget_fkey";
                        columns: ["budget"];
                        isOneToOne: false;
                        referencedRelation: "budgets";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "budget_profile_profile_fkey";
                        columns: ["profile"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            budgets: {
                Row: {
                    created_at: string | null;
                    id: string;
                    name: string | null;
                    owner: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: string;
                    name?: string | null;
                    owner?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: string;
                    name?: string | null;
                    owner?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "budgets_owner_fkey";
                        columns: ["owner"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            contributions: {
                Row: {
                    amount: number | null;
                    budget: string | null;
                    created_at: string | null;
                    id: string;
                    income_source: string | null;
                    objective_id: string | null;
                    other_source: string | null;
                    payment_date: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    amount?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    id?: string;
                    income_source?: string | null;
                    objective_id?: string | null;
                    other_source?: string | null;
                    payment_date?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    amount?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    id?: string;
                    income_source?: string | null;
                    objective_id?: string | null;
                    other_source?: string | null;
                    payment_date?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "contributions_budget_fkey";
                        columns: ["budget"];
                        isOneToOne: false;
                        referencedRelation: "budgets";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "contributions_income_source_fkey";
                        columns: ["income_source"];
                        isOneToOne: false;
                        referencedRelation: "income_sources";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "contributions_objective_id_fkey";
                        columns: ["objective_id"];
                        isOneToOne: false;
                        referencedRelation: "objectives";
                        referencedColumns: ["id"];
                    }
                ];
            };
            income: {
                Row: {
                    amount_gross: number | null;
                    amount_net: number | null;
                    budget: string | null;
                    created_at: string | null;
                    effective_date: string | null;
                    emoji: string | null;
                    frequency_per_year: number | null;
                    id: string;
                    income_source: string | null;
                    income_type:
                        | Database["public"]["Enums"]["income_type"]
                        | null;
                    max_amount: number | null;
                    min_amount: number | null;
                    name: string | null;
                    number_payments_month: number | null;
                    number_payments_year: number | null;
                };
                Insert: {
                    amount_gross?: number | null;
                    amount_net?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    effective_date?: string | null;
                    emoji?: string | null;
                    frequency_per_year?: number | null;
                    id?: string;
                    income_source?: string | null;
                    income_type?:
                        | Database["public"]["Enums"]["income_type"]
                        | null;
                    max_amount?: number | null;
                    min_amount?: number | null;
                    name?: string | null;
                    number_payments_month?: number | null;
                    number_payments_year?: number | null;
                };
                Update: {
                    amount_gross?: number | null;
                    amount_net?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    effective_date?: string | null;
                    emoji?: string | null;
                    frequency_per_year?: number | null;
                    id?: string;
                    income_source?: string | null;
                    income_type?:
                        | Database["public"]["Enums"]["income_type"]
                        | null;
                    max_amount?: number | null;
                    min_amount?: number | null;
                    name?: string | null;
                    number_payments_month?: number | null;
                    number_payments_year?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "income_budget_fkey";
                        columns: ["budget"];
                        isOneToOne: false;
                        referencedRelation: "budgets";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "income_income_source_fkey";
                        columns: ["income_source"];
                        isOneToOne: false;
                        referencedRelation: "income_sources";
                        referencedColumns: ["id"];
                    }
                ];
            };
            income_sources: {
                Row: {
                    avatar: string | null;
                    created_at: string | null;
                    emoji: string | null;
                    end_date: string | null;
                    id: string;
                    name: string | null;
                    profile: string | null;
                    start_date: string | null;
                    type: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    avatar?: string | null;
                    created_at?: string | null;
                    emoji?: string | null;
                    end_date?: string | null;
                    id?: string;
                    name?: string | null;
                    profile?: string | null;
                    start_date?: string | null;
                    type?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    avatar?: string | null;
                    created_at?: string | null;
                    emoji?: string | null;
                    end_date?: string | null;
                    id?: string;
                    name?: string | null;
                    profile?: string | null;
                    start_date?: string | null;
                    type?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "income_sources_profile_fkey";
                        columns: ["profile"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            objectives: {
                Row: {
                    amount_left: number | null;
                    budget: string | null;
                    created_at: string | null;
                    due_date: string | null;
                    id: string;
                    name: string | null;
                    total_amount: number | null;
                    updated_at: string | null;
                };
                Insert: {
                    amount_left?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    due_date?: string | null;
                    id?: string;
                    name?: string | null;
                    total_amount?: number | null;
                    updated_at?: string | null;
                };
                Update: {
                    amount_left?: number | null;
                    budget?: string | null;
                    created_at?: string | null;
                    due_date?: string | null;
                    id?: string;
                    name?: string | null;
                    total_amount?: number | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "objectives_budget_fkey";
                        columns: ["budget"];
                        isOneToOne: false;
                        referencedRelation: "budgets";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    avatar_url: string | null;
                    created_at: string | null;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    last_name: string | null;
                    phone: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    phone?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    phone?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            income_type: "fixed" | "variable";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
          Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
          Database["public"]["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

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
    : never;
