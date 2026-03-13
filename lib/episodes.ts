import type { Episode } from '@/types'

export const episodes: Episode[] = [
  {
    id: '1',
    slug: 'the-shepherds-promise',
    psalmNumber: 23,
    psalmReference: 'Psalm 23',
    title: "The Shepherd's Promise",
    description:
      'A story of trust and divine guidance in uncertain seasons. When David faced the valley of shadows, he did not face it alone. This episode brings to life the comforting words of Psalm 23 through a dramatic visual narrative of a man walking through his darkest night.',
    reflection:
      'Even in our deepest valleys, we are not alone. The Shepherd who led David is the same Shepherd who walks with us today. Where are you placing your trust in this season?',
    thumbnailGradient: 'from-[#0f1e35] to-[#0a1525]',
    duration: '8 min',
    featured: true,
  },
  {
    id: '2',
    slug: 'light-in-darkness',
    psalmNumber: 27,
    psalmReference: 'Psalm 27',
    title: 'Light in Darkness',
    description:
      'David cries out from a place of fear — surrounded by enemies, facing uncertainty. Yet in the middle of it all, he makes a bold declaration: The Lord is my light and my salvation. This is a story about courage that defies circumstance.',
    reflection:
      'What does it mean to seek God\'s face in the middle of your storm? Psalm 27 invites us to desire one thing above all else — to dwell in His presence.',
    thumbnailGradient: 'from-[#0d1a2a] to-[#1a2e45]',
    duration: '7 min',
  },
  {
    id: '3',
    slug: 'god-our-refuge',
    psalmNumber: 46,
    psalmReference: 'Psalm 46',
    title: 'God Our Refuge',
    description:
      'When the earth gives way and mountains fall into the sea, the sons of Korah declare one truth: God is our refuge. This episode captures what it means to find stillness in the middle of catastrophe.',
    reflection:
      '"Be still and know that I am God." In what areas of your life do you need to stop striving and trust His sovereignty?',
    thumbnailGradient: 'from-[#111a0f] to-[#1e2d1a]',
    duration: '9 min',
  },
  {
    id: '4',
    slug: 'under-his-wings',
    psalmNumber: 91,
    psalmReference: 'Psalm 91',
    title: 'Under His Wings',
    description:
      'A story of protection, presence, and the shelter only found in God. Psalm 91 has comforted generations in times of plague, war, and personal crisis. This visual drama brings its promises to life.',
    reflection:
      'The protection promised in Psalm 91 is not the absence of trouble — it is the presence of God in the middle of it. How does that change how you face your fears?',
    thumbnailGradient: 'from-[#1a1208] to-[#2a1e0c]',
    duration: '10 min',
  },
  {
    id: '5',
    slug: 'the-keeper-of-israel',
    psalmNumber: 121,
    psalmReference: 'Psalm 121',
    title: 'The Keeper of Israel',
    description:
      'A pilgrim lifts his eyes to the hills and asks the ancient question: where does my help come from? This episode follows a journey of faith — one step at a time — toward a God who never sleeps.',
    reflection:
      'God\'s watchfulness over your life is not occasional — it is constant. He who keeps Israel neither slumbers nor sleeps. How does this truth speak to your anxieties today?',
    thumbnailGradient: 'from-[#0a1525] to-[#152540]',
    duration: '6 min',
  },
  {
    id: '6',
    slug: 'known-completely',
    psalmNumber: 139,
    psalmReference: 'Psalm 139',
    title: 'Known Completely',
    description:
      'Before a word is on your tongue, He knows it. Before you were formed in the womb, He saw you. Psalm 139 is the most intimate Psalm in the collection — a meditation on being fully known and fully loved.',
    reflection:
      'There is no version of you that God does not already know. How does being fully known by God — not despite your flaws but with them — change how you see yourself?',
    thumbnailGradient: 'from-[#181010] to-[#2a1a1a]',
    duration: '11 min',
  },
]

export const getFeaturedEpisode = (): Episode =>
  episodes.find((e) => e.featured) ?? episodes[0]

export const getEpisodeBySlug = (slug: string): Episode | undefined =>
  episodes.find((e) => e.slug === slug)
