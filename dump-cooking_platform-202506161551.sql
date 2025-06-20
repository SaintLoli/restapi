PGDMP   *    3                }            cooking_platform #   16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)    17.0 C    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16410    cooking_platform    DATABASE     x   CREATE DATABASE cooking_platform WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
     DROP DATABASE cooking_platform;
                  
   chef_admin    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    16451    chefs    TABLE     �   CREATE TABLE public.chefs (
    chef_id integer NOT NULL,
    user_id integer,
    bio text,
    specialization character varying(100),
    rating numeric(3,2) DEFAULT 0.0
);
    DROP TABLE public.chefs;
       public         heap r       postgres    false    4            �           0    0    TABLE chefs    ACL     c   GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.chefs TO chef_admin;
          public               postgres    false    218            �            1259    16450    chefs_chef_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chefs_chef_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.chefs_chef_id_seq;
       public               postgres    false    218    4            �           0    0    chefs_chef_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.chefs_chef_id_seq OWNED BY public.chefs.chef_id;
          public               postgres    false    217            �           0    0    SEQUENCE chefs_chef_id_seq    ACL     >   GRANT ALL ON SEQUENCE public.chefs_chef_id_seq TO chef_admin;
          public               postgres    false    217            �            1259    16480    ingredients    TABLE     �   CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    recipe_id integer,
    name character varying(100) NOT NULL,
    amount character varying(50) NOT NULL
);
    DROP TABLE public.ingredients;
       public         heap r       postgres    false    4            �           0    0    TABLE ingredients    ACL     i   GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.ingredients TO chef_admin;
          public               postgres    false    222            �            1259    16479    ingredients_ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.ingredients_ingredient_id_seq;
       public               postgres    false    222    4            �           0    0    ingredients_ingredient_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;
          public               postgres    false    221            �           0    0 &   SEQUENCE ingredients_ingredient_id_seq    ACL     J   GRANT ALL ON SEQUENCE public.ingredients_ingredient_id_seq TO chef_admin;
          public               postgres    false    221            �            1259    16492    masterclasses    TABLE     �   CREATE TABLE public.masterclasses (
    class_id integer NOT NULL,
    chef_id integer,
    recipe_id integer,
    schedule timestamp without time zone NOT NULL,
    price numeric(10,2),
    max_participants integer
);
 !   DROP TABLE public.masterclasses;
       public         heap r       postgres    false    4            �           0    0    TABLE masterclasses    ACL     k   GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.masterclasses TO chef_admin;
          public               postgres    false    224            �            1259    16491    masterclasses_class_id_seq    SEQUENCE     �   CREATE SEQUENCE public.masterclasses_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.masterclasses_class_id_seq;
       public               postgres    false    224    4            �           0    0    masterclasses_class_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.masterclasses_class_id_seq OWNED BY public.masterclasses.class_id;
          public               postgres    false    223            �           0    0 #   SEQUENCE masterclasses_class_id_seq    ACL     G   GRANT ALL ON SEQUENCE public.masterclasses_class_id_seq TO chef_admin;
          public               postgres    false    223            �            1259    16466    recipes    TABLE     �  CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    chef_id integer,
    title character varying(100) NOT NULL,
    cooking_time integer,
    difficulty character varying(20),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT recipes_difficulty_check CHECK (((difficulty)::text = ANY ((ARRAY['легко'::character varying, 'средне'::character varying, 'сложно'::character varying])::text[])))
);
    DROP TABLE public.recipes;
       public         heap r    
   chef_admin    false    4            �            1259    16465    recipes_recipe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.recipes_recipe_id_seq;
       public            
   chef_admin    false    220    4            �           0    0    recipes_recipe_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;
          public            
   chef_admin    false    219            �            1259    16514    user_classes    TABLE     �   CREATE TABLE public.user_classes (
    user_id integer NOT NULL,
    class_id integer NOT NULL,
    registration_date timestamp without time zone DEFAULT now()
);
     DROP TABLE public.user_classes;
       public         heap r       postgres    false    4            �           0    0    TABLE user_classes    ACL     j   GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_classes TO chef_admin;
          public               postgres    false    225            �            1259    16437    users    TABLE     �   CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4            �           0    0    TABLE users    ACL     c   GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.users TO chef_admin;
          public               postgres    false    216            �            1259    16436    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public               postgres    false    4    216            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public               postgres    false    215            �           0    0    SEQUENCE users_user_id_seq    ACL     >   GRANT ALL ON SEQUENCE public.users_user_id_seq TO chef_admin;
          public               postgres    false    215            �           2604    16454    chefs chef_id    DEFAULT     n   ALTER TABLE ONLY public.chefs ALTER COLUMN chef_id SET DEFAULT nextval('public.chefs_chef_id_seq'::regclass);
 <   ALTER TABLE public.chefs ALTER COLUMN chef_id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    16483    ingredients ingredient_id    DEFAULT     �   ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);
 H   ALTER TABLE public.ingredients ALTER COLUMN ingredient_id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16495    masterclasses class_id    DEFAULT     �   ALTER TABLE ONLY public.masterclasses ALTER COLUMN class_id SET DEFAULT nextval('public.masterclasses_class_id_seq'::regclass);
 E   ALTER TABLE public.masterclasses ALTER COLUMN class_id DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    16469    recipes recipe_id    DEFAULT     v   ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);
 @   ALTER TABLE public.recipes ALTER COLUMN recipe_id DROP DEFAULT;
       public            
   chef_admin    false    220    219    220            �           2604    16440    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    215    216    216                      0    16451    chefs 
   TABLE DATA                 public               postgres    false    218   �L       �          0    16480    ingredients 
   TABLE DATA                 public               postgres    false    222   �M       �          0    16492    masterclasses 
   TABLE DATA                 public               postgres    false    224   �M       �          0    16466    recipes 
   TABLE DATA                 public            
   chef_admin    false    220   �N       �          0    16514    user_classes 
   TABLE DATA                 public               postgres    false    225   �O       }          0    16437    users 
   TABLE DATA                 public               postgres    false    216   bP       �           0    0    chefs_chef_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.chefs_chef_id_seq', 1, true);
          public               postgres    false    217            �           0    0    ingredients_ingredient_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 1, false);
          public               postgres    false    221            �           0    0    masterclasses_class_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.masterclasses_class_id_seq', 16, true);
          public               postgres    false    223            �           0    0    recipes_recipe_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 12, true);
          public            
   chef_admin    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public               postgres    false    215            �           2606    16459    chefs chefs_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (chef_id);
 :   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_pkey;
       public                 postgres    false    218            �           2606    16485    ingredients ingredients_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public                 postgres    false    222            �           2606    16497     masterclasses masterclasses_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.masterclasses
    ADD CONSTRAINT masterclasses_pkey PRIMARY KEY (class_id);
 J   ALTER TABLE ONLY public.masterclasses DROP CONSTRAINT masterclasses_pkey;
       public                 postgres    false    224            �           2606    16473    recipes recipes_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public              
   chef_admin    false    220            �           2606    16519    user_classes user_classes_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.user_classes
    ADD CONSTRAINT user_classes_pkey PRIMARY KEY (user_id, class_id);
 H   ALTER TABLE ONLY public.user_classes DROP CONSTRAINT user_classes_pkey;
       public                 postgres    false    225    225            �           2606    16449    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    216            �           2606    16445    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    216            �           2606    16447    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    216            �           1259    16509    idx_masterclasses_schedule    INDEX     X   CREATE INDEX idx_masterclasses_schedule ON public.masterclasses USING btree (schedule);
 .   DROP INDEX public.idx_masterclasses_schedule;
       public                 postgres    false    224            �           1259    16508    idx_recipes_chef    INDEX     G   CREATE INDEX idx_recipes_chef ON public.recipes USING btree (chef_id);
 $   DROP INDEX public.idx_recipes_chef;
       public              
   chef_admin    false    220            �           1259    16530    idx_user_classes_user    INDEX     Q   CREATE INDEX idx_user_classes_user ON public.user_classes USING btree (user_id);
 )   DROP INDEX public.idx_user_classes_user;
       public                 postgres    false    225            �           2606    16460    chefs chefs_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_user_id_fkey;
       public               postgres    false    216    218    3286            �           2606    16486 &   ingredients ingredients_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_recipe_id_fkey;
       public               postgres    false    220    222    3293            �           2606    16498 (   masterclasses masterclasses_chef_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.masterclasses
    ADD CONSTRAINT masterclasses_chef_id_fkey FOREIGN KEY (chef_id) REFERENCES public.chefs(chef_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.masterclasses DROP CONSTRAINT masterclasses_chef_id_fkey;
       public               postgres    false    224    3290    218            �           2606    16503 *   masterclasses masterclasses_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.masterclasses
    ADD CONSTRAINT masterclasses_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id) ON DELETE SET NULL;
 T   ALTER TABLE ONLY public.masterclasses DROP CONSTRAINT masterclasses_recipe_id_fkey;
       public               postgres    false    220    224    3293            �           2606    16474    recipes recipes_chef_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_chef_id_fkey FOREIGN KEY (chef_id) REFERENCES public.chefs(chef_id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_chef_id_fkey;
       public            
   chef_admin    false    3290    218    220            �           2606    16525 '   user_classes user_classes_class_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_classes
    ADD CONSTRAINT user_classes_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.masterclasses(class_id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.user_classes DROP CONSTRAINT user_classes_class_id_fkey;
       public               postgres    false    225    224    3298            �           2606    16520 &   user_classes user_classes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_classes
    ADD CONSTRAINT user_classes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.user_classes DROP CONSTRAINT user_classes_user_id_fkey;
       public               postgres    false    225    3286    216                       826    16513     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     b   ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO chef_admin;
          public               postgres    false    4                       826    16512    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO chef_admin;
          public               postgres    false    4                  INSERT INTO public.chefs VALUES     (    1    ,     1    ,  4   'Профессиональный шеф-повар'    ,  #   'Итальянская кухня'    ,     0.00    )    ;
    

      �      

      �   '   INSERT INTO public.masterclasses VALUES     (    14    ,     1    ,     2    ,     '2025-06-07 11:29:00'    ,     2000.00    ,     4    )    ;
 '   INSERT INTO public.masterclasses VALUES     (    2    ,     1    ,     2    ,     '2023-12-15 12:00:00'    ,     200.00    ,     10    )    ;
    

      �   !   INSERT INTO public.recipes VALUES     (    2    ,     1    ,     'Паста Карбонара'    ,     30    ,     'средне'    ,     '2025-06-16 13:26:16.827842'    )    ;
    

      �   &   INSERT INTO public.user_classes VALUES     (    1    ,     2    ,     '2025-06-16 13:48:08.853234'    )    ;
    

      }      INSERT INTO public.users VALUES     (    1    ,     'chef_john'    ,     'john@example.com'    ,     'hashed_password123'    ,     '2025-06-16 13:25:46.169226'    )    ;
    

     