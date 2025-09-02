import type { Matiere } from '../../types/programmation.types';

/**
 * Represents a domain tag for visual identification.
 *
 * Used in the programmation table to show which domains are active
 * in a particular week or period.
 */
export interface DomainTag {
  /** Display name of the domain */
  name: string;
  /** Color identifier for visual styling */
  color: string;
}

/**
 * Represents data for a specific week in the programmation timeline.
 *
 * Contains information about which domains are active during this week.
 */
export interface WeekData {
  /** Array of domains that have content scheduled for this week */
  domains: DomainTag[];
}

/**
 * Represents a row in the programmation table corresponding to a topic/domain.
 *
 * Each row shows one domain across all time periods with its associated
 * subject information and weekly data.
 */
export interface TopicRow {
  /** Unique identifier for the topic */
  id: string;
  /** Display name of the topic/domain */
  name: string;
  /** Color identifier for visual styling */
  color: string;
  /** Parent subject that contains this topic */
  matiere: Matiere;
  /** Data for each week showing domain activity */
  weeks: WeekData[];
}

/**
 * Represents a timeline block of educational content.
 *
 * Timeline blocks are visual elements that span one or more weeks
 * and contain educational content for a specific topic.
 */
export interface TimelineBlock {
  /** Unique identifier for the block */
  id: string;
  /** ID of the topic this block belongs to */
  topicId: string;
  /** Educational content (may contain HTML) */
  content: string;
  /** Week number when this block starts (0-indexed) */
  startWeek: number;
  /** Number of weeks this block spans */
  duration: number;
  /** Color identifier for visual styling */
  color: string;
}

/**
 * Extended topic row that includes timeline blocks for advanced visualization.
 *
 * Combines the basic topic information with timeline blocks that can
 * be used for more sophisticated rendering approaches.
 */
export interface TopicWithTimelineBlock extends TopicRow {
  /** Timeline blocks associated with this topic */
  blocks: TimelineBlock[];
}
