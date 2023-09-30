-- DropForeignKey
ALTER TABLE "offered_course_class_schedules" DROP CONSTRAINT "offered_course_class_schedules_offeredCourseSectionId_fkey";

-- AddForeignKey
ALTER TABLE "offered_course_class_schedules" ADD CONSTRAINT "offered_course_class_schedules_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
