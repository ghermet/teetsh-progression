/**
 * Represents a time period within an educational progression.
 *
 * Periods define the temporal structure of the progression, typically representing
 * weeks or months during which educational activities take place.
 */
export interface Periode {
  /** Unique identifier for the period */
  id: string;
  /** Display name of the period (e.g., "Semaine 1", "Octobre") */
  name: string;
  /** Color identifier used for visual styling (maps to CSS variables) */
  color: string;
  /** End date of the period in ISO format */
  endDate: string;
  /** Numerical position for ordering periods chronologically */
  position: number;
  /** Start date of the period in ISO format */
  startDate: string;
  /** ID of the parent programmation this period belongs to */
  programmationId: string;
}

/**
 * Represents an individual learning item or educational content piece.
 *
 * Items contain the actual educational content (often HTML) and are positioned
 * within the timeline by their association with a specific domain and period.
 */
export interface Item {
  /** Vertical position for visual arrangement */
  y: number;
  /** Unique identifier for the item */
  id: string;
  /** The educational content (may contain HTML) */
  value: string;
  /** Associated sequence information (currently unused) */
  Sequence: null;
  /** ID of the domain this item belongs to */
  domaineId: string;
  /** ID of the period when this item is scheduled */
  periodeId: string;
  /** Associated preparation sheet (currently unused) */
  FicheDePrep: null;
  /** File attachments related to this item */
  attachments: unknown[];
}

/**
 * Represents a domain within a subject area.
 *
 * Domains are subdivisions of subjects that group related learning items.
 * For example, within "Histoire et géographie", there might be separate
 * domains for "Histoire" and "Géographie".
 */
export interface Domaine {
  /** Unique identifier for the domain */
  id: string;
  /** Display name of the domain */
  name: string;
  /** Color identifier used for visual styling */
  color: string;
  /** Learning items within this domain */
  items: Item[];
  /** ID of the parent subject (matière) */
  matiereId: string;
}

/**
 * Represents a subject area in the educational curriculum.
 *
 * Subjects (matières) are the main organizational units of the curriculum,
 * such as "Mathématiques", "Histoire et géographie", etc.
 */
export interface Matiere {
  /** Unique identifier for the subject */
  id: string;
  /** Display name of the subject */
  name: string;
  /** Color identifier used for visual styling */
  color: string;
  /** Domains within this subject */
  domaines: Domaine[];
  /** Numerical position for ordering subjects */
  position: number;
  /** ID of the parent programmation */
  programmationId: string;
}

/**
 * Complete progression data structure containing all educational content and metadata.
 *
 * This is the main data structure that represents an entire educational progression,
 * including subjects, domains, periods, items, and various configuration options.
 */
export interface ProgressionData {
  /** Unique numeric identifier */
  id: number;
  /** Display name of the progression */
  name: string;
  /** Brief description of the progression */
  shortDescription: string;
  /** Date when the progression was created */
  date: string;
  /** ID of the user who owns this progression */
  userId: string;
  /** Number of times accessed from landing page */
  nbOfUseLanding: number;
  /** Number of times accessed within the app */
  nbOfUseInApp: number;
  /** ID of the associated school year */
  schoolyearId: string;
  /** ID of the associated school */
  schoolId: string;
  /** ID of the parent programmation */
  programmationId: string;
  /** Time periods that structure the progression timeline */
  periodes: Periode[];
  /** Subject areas containing domains and learning items */
  matieres: Matiere[];
  /** Width of columns in the table view */
  columnWidth: number;
  /** Font size setting for the progression display */
  fontSize: string;
  /** View type/mode for displaying the progression */
  view: string;
  /** Whether to invert rows and columns in the display */
  invertedRowCol: boolean;
  /** Educational level (e.g., "CP", "CE1", "6ème") */
  niveau: string;
  /** Timestamp when the progression was created */
  createdAt: string;
  /** Timestamp when the progression was last updated */
  updatedAt: string;
  /** Timestamp when the progression was published */
  publishedAt: string;
  /** Single-page view for a specific subject (currently unused) */
  onePageMatiere: null;
  /** URL-friendly identifier */
  slug: string;
  /** Document identifier in the CMS */
  documentId: string;
}

/**
 * API response wrapper for progression data from Strapi CMS.
 *
 * Standard Strapi response format containing the progression data
 * and additional metadata about the request/response.
 */
export interface ProgressionResponse {
  /** The actual progression data */
  data: ProgressionData;
  /** Additional metadata from the CMS */
  meta: Record<string, unknown>;
}
