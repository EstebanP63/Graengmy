<!-- LessonsRenderer.vue -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
  lessons: Array,
  viewMode: String
});

const handleClick = (lesson) => {
  props.viewMode === 'admin'
    ? console.log('Editing', lesson)
    : console.log('Opening', lesson);
};

const lessonClass = (lesson) => {
  if (props.viewMode === 'admin') return 'lesson-admin';
  if (lesson.completed) return 'lesson-complete'; // TODO: Get user completed lessons and check if lesson is inside
  if (lesson.available) return 'lesson-available'; // Then, with this array of completed lessons, compute which lessons are available
  return 'lesson-locked'; // Genuinely thinking about refactoring nextLessonId for RequiredLessonId in order to make this compute easier
};

// Group lessons by order
const groupedLessons = computed(() => {
  const groups = {};
  props.lessons.forEach(lesson => {
    if (!groups[lesson.order]) groups[lesson.order] = [];
    groups[lesson.order].push(lesson);
  });

  return Object.entries(groups).map(([order, items]) => ({
    order,
    items
  }));
});
</script>



<template>
  <div class="lesson-layers">
    <div
      v-for="(group, index) in groupedLessons"
      :key="'layer-' + index"
      class="lesson-layer"
    >
      <h4 class="layer-label">Level {{ group.order }}</h4>
      <div class="lesson-row">
        <div
          v-for="lesson in group.items"
          :key="lesson._id"
          :class="['lesson-card', lessonClass(lesson)]"
          @click="handleClick(lesson)"
        >
          <h3 class="lesson-title">{{ lesson.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.lesson-title {
  color: black;
}
.lesson-layers {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.lesson-layer {
  border-top: 2px dashed #eee;
  padding-top: 1rem;
}

.layer-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.lesson-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.lesson-card {
  width: 140px;
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px #0002;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.lesson-card:hover {
  transform: scale(1.05);
}

.lesson-complete { border-left: 5px solid #8bc34a; }
.lesson-available { border-left: 5px solid #2196f3; }
.lesson-locked {
  border-left: 5px solid #ccc;
  opacity: 0.5;
  pointer-events: none;
}
.lesson-admin {
  border-left: 5px solid #ffc107;
  cursor: grab;
}

</style>
