export { default as ControlTypeTile } from '../../components/ControlTypeTile.vue'
export { default as Keyword } from '../../components/Keyword.vue'
export { default as LoadingScreen } from '../../components/LoadingScreen.vue'
export { default as ModalTooltip } from '../../components/ModalTooltip.vue'
export { default as PercentProgress } from '../../components/PercentProgress.vue'
export { default as ProfessionCard } from '../../components/ProfessionCard.vue'
export { default as Spinner } from '../../components/Spinner.vue'
export { default as TrajectoryCard } from '../../components/Trajectory/Card.vue'
export { default as TrajectoryCourseSelector } from '../../components/Trajectory/CourseSelector.vue'
export { default as TrajectoryDiplomShare } from '../../components/Trajectory/DiplomShare.vue'
export { default as TrajectoryDiploma } from '../../components/Trajectory/Diploma.vue'
export { default as TrajectoryDiplomaDisciplineModal } from '../../components/Trajectory/DiplomaDisciplineModal.vue'
export { default as TrajectoryDiplomaShareModal } from '../../components/Trajectory/DiplomaShareModal.vue'
export { default as TrajectoryDisciplineModal } from '../../components/Trajectory/DisciplineModal.vue'
export { default as TrajectoryFeedbackForm } from '../../components/Trajectory/FeedbackForm.vue'
export { default as TrajectoryGenericModalComponent } from '../../components/Trajectory/GenericModalComponent.vue'
export { default as TrajectoryKeywordModal } from '../../components/Trajectory/KeywordModal.vue'
export { default as TrajectoryKeywordModalDiploma } from '../../components/Trajectory/KeywordModalDiploma.vue'
export { default as TrajectoryListOfExams } from '../../components/Trajectory/ListOfExams.vue'
export { default as TrajectoryModalDiplomaDisciplineCreation } from '../../components/Trajectory/ModalDiplomaDisciplineCreation.vue'
export { default as TrajectoryModalDiplomaExamType } from '../../components/Trajectory/ModalDiplomaExamType.vue'
export { default as TrajectoryPreset } from '../../components/Trajectory/Preset.vue'
export { default as TrajectoryRandomFeedback } from '../../components/Trajectory/RandomFeedback.vue'
export { default as TrajectoryStats } from '../../components/Trajectory/TrajectoryStats.vue'
export { default as SelectedPresets } from '../../components/selectedPresets/index.vue'
export { default as SkillSets } from '../../components/skillSets/index.vue'
export { default as Keywords } from '../../components/keywords/index.vue'
export { default as IconsPresetIcon } from '../../components/icons/PresetIcon.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
