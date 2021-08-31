/** @type null */
type UnknownNullableProp = unknown;

export interface UserData {
  /** @faker internet.userName */
  username: string;
  /** @faker internet.email */
  emailAddress?: string;
  /** @faker company.companyName */
  companyName?: string;
  confirmed: boolean;
  isAdmin: boolean;
  artistDetailAllowed: boolean;
  audiotaggingAllowed: boolean;
  fingerprintAllowed: boolean;
  fullSearchAllowed: boolean;
  playlistPredictionAllowed: boolean;
  recordingDetailAllowed: boolean;
  signupAllowed: boolean;
  uploadAllowed: boolean;
  voiceSearchAllowed: boolean;
  widgetsAllowed: boolean;
}

export interface SignUpData {
  /** @faker company.companyName */
  companyName?: string;
  /** @faker name.findName */
  fullName: string;
  /** @faker internet.email */
  emailAddress: string;
  /** @faker { "random.alphaNumeric": [4] } */
  captcha: string;
  /** @faker internet.password */
  password: string;
  tos: boolean;
}

export type Validation =
  | { empty: true; error?: never }
  | { empty: false; error: string | false };

export type SignUpDataValidations = {
  [k in keyof SignUpData]: Validation;
};

/** @faker { "date.format": ["yyyy-MM-dd HH:mm:ss.S", "past"] } */
type PartyDate = string;

/** @faker { "date.format": ["yyyy", "past"] } */
type PartyYear = string;

export interface Party {
  /** @faker name.findName */
  fullName: string;
  birthDate: PartyDate;
  deathDate: PartyDate | null;
  birthYear: PartyYear;
  deathYear: PartyYear | null;
  /** @faker address.city */
  birthPlace: string;
  musicbrainzType: 'Person' | 'Group';
  /** @faker address.city */
  area: string;
}

export interface ContributorType {
  /** @faker { "random.arrayElement": [["401", "421", "trackArtist", "138"]] } */
  typeName: string;
}

export interface PartySimplified {
  /** @faker name.findName */
  fullName: string;
  /** @faker datatype.uuid */
  id: string;
}

export interface PartyEntity {
  party: PartySimplified;
  /**
   * @minItems 1
   * @maxItems 3
   * @uniqueItems true
   **/
  contributorTypes: ContributorType[];
}
export interface RecordingTrackProductPartyEntity
  extends Omit<PartyEntity, 'party'> {
  party: RecordingTrackProductParty;
}

export interface RecordingGenre {
  parent: RecordingGenre | null;
  /** @faker datatype.number */
  id: number;
  /** @faker music.genre */
  name: string;
}

export interface Title {
  /** @faker { "fake": "{{hacker.adjective}} {{hacker.noun}}" } */
  titleText: string;
  isSubtitle: boolean | null;
}

/** @faker { "datatype.float": [{ "min": 30, "max": 250 }] } */
type Bpm = number;
export interface MusicalFeatures {
  bpm: Bpm | null;
  [key: string]: number | string | null;
}

export interface RecordingTagCategory {
  /** @faker lorem.word */
  categoryName: string;
}

export interface RecordingTag {
  parent: RecordingTag | null;
  /** @faker datatype.number */
  id: number;
  /** @faker lorem.word */
  name: string;
  /**
   * @minItems 1
   * @maxItems 3
   * @uniqueItems true
   * */
  categories: RecordingTagCategory[];
}

interface RecordingTagContainer {
  tag: RecordingTag;
}

export interface Pline {
  year: number;
  text: string;
}
export interface RecordingTrackProductParty {
  /** @faker name.findName */
  fullName: string;
  proprietaryIdGvlLabelcode: UnknownNullableProp;
  /** @faker name.firstName */
  fullNameIndexed: string | null;
}
export interface RecordingTrackGenre {
  /** @faker music.genre */
  genreName: string;
}
export interface RecordingTrackProduct {
  duration: string | null;
  genres: RecordingTrackGenre[];
  /** @faker { "date.format": ["yyyy-MM-dd", "past"] } */
  releaseDate: string;
  gtin: string;
  grid: string;
  /** @type null */
  takedownDate: string | null;
  pline: Pline | null;
  titles: Title[];
  parties: RecordingTrackProductPartyEntity[];
}
export interface RecordingTrack {
  product: RecordingTrackProduct;
  trackNo: string;
  setNo: string;
}

export interface Recording {
  /**
   * @minItems 1
   * @maxItems 3
   * @uniqueItems true
   * */
  recordingPartyEntities: PartyEntity[];
  genres: RecordingGenre[];
  titles: Title[];
  /** @faker { "date.format": ["yyyy-MM-dd", "past"] } */
  releaseDate: string | null;
  isrc: string;
  /** @type null  */
  spotifyId: string | null;
  /** @type null  */
  youtubeId: string | null;
  languageOfPerformance: string;
  musicalFeatures?: Partial<MusicalFeatures>;
  tags: RecordingTagContainer[];
}

export interface FullRecording
  extends Omit<Recording, 'recordingPartyEntities'> {
  duration: string | null;
  /** @faker datatype.uuid */
  isrc: string;
  /**
   * @minItems 1
   * @maxItems 20
   * @uniqueItems true
   * */
  tracks: RecordingTrack[];
  /**
   * @minItems 1
   * @maxItems 3
   * @uniqueItems true
   * */
  parties: RecordingTrackProductPartyEntity[];
  pline: Pline;
}

/**
 * @minItems 1
 * @uniqueItems true
 * */
export type Recordings = Recording[];

export interface Tag {
  subtags?: Tag[];
  /** @faker datatype.number */
  id: number;
  /** @faker lorem.word */
  name: string;
}

export interface TagCategory {
  tags: Tag[];
  /** @faker datatype.number */
  id: number;
  /** @faker lorem.word */
  name: string;
}

/**
 * @minItems 1
 * @uniqueItems true
 * */
export type TagCategories = TagCategory[];

export interface Genre {
  subgenres: Genre[];
  /** @faker datatype.number */
  id: number;
  /** @faker music.genre */
  name: string;
}

/**
 * @minItems 2
 * @uniqueItems true
 * */
export type Genres = Genre[];

export type SearchFiltersResponse = Record<string, string[]>;

interface CompleteArtistNameArtist {
  type: 'ARTIST';
  artistName: string;
  contributorTypes: string[];
  recordingTitle: null | string;
}
interface CompleteArtistNameTrack {
  type: 'TRACK';
  artistName: string;
  contributorTypes: string[];
  recordingTitle: string;
}

export type CompleteArtistNameResponse = (
  | CompleteArtistNameArtist
  | CompleteArtistNameTrack
)[];

export interface Anniversary {
  /** @faker name.findName */
  fullName: string;
  /** @faker name.findName */
  fullNameIndexed: string;
  /** @faker { "date.format": ["yyyy-MM-dd", "past"] } */
  lifespanBegin: string;
  /** @faker { "date.format": ["yyyy-MM-dd", "past"] } */
  lifespanEnd: string | null;
}
