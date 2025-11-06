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
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          role: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          updated_at?: string;
        };
      };
      api_credentials: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          encrypted_key: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: string;
          encrypted_key: string;
          created_at?: string;
        };
        Update: {
          provider?: string;
          encrypted_key?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string | null;
          metadata?: Json | null;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          session_id: string;
          sender: "user" | "assistant" | "system";
          content: string;
          created_at: string;
          provider_message_id: string | null;
        };
        Insert: {
          id?: string;
          session_id: string;
          sender: "user" | "assistant" | "system";
          content: string;
          created_at?: string;
          provider_message_id?: string | null;
        };
        Update: {
          provider_message_id?: string | null;
        };
      };
      prompts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          content: string;
          tags: string[] | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          content: string;
          tags?: string[] | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          content?: string;
          tags?: string[] | null;
          is_public?: boolean;
          updated_at?: string;
        };
      };
      prompt_versions: {
        Row: {
          id: string;
          prompt_id: string;
          version: number;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          prompt_id: string;
          version: number;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
      prompt_usage_logs: {
        Row: {
          id: string;
          prompt_id: string;
          session_id: string;
          executed_at: string;
          provider: string | null;
          latency_ms: number | null;
          token_count: number | null;
        };
        Insert: {
          id?: string;
          prompt_id: string;
          session_id: string;
          executed_at?: string;
          provider?: string | null;
          latency_ms?: number | null;
          token_count?: number | null;
        };
        Update: {
          provider?: string | null;
          latency_ms?: number | null;
          token_count?: number | null;
        };
      };
    };
    Functions: {};
  };
}
