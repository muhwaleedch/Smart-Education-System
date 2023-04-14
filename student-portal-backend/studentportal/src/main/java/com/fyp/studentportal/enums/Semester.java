package com.fyp.studentportal.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class CustomArrayList<T> extends ArrayList<T> {
    @SafeVarargs
    public final List<T> addAll(T... args) {
        Arrays.stream(args).forEach(this::add);
        return this;
    }
}


public enum Semester {
    SEMESTER_I,
    SEMESTER_II,
    SEMESTER_III,
    SEMESTER_IV,
    SEMESTER_V,
    SEMESTER_VI,
    SEMESTER_VII,
    SEMESTER_VIII;

    public static List<Semester> getSemesters(Semester currentSemester) {
        CustomArrayList<Semester> semesters = new CustomArrayList<>();
        switch (currentSemester) {
            case SEMESTER_I:
                return semesters.addAll(SEMESTER_I);
            case SEMESTER_II:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II);
            case SEMESTER_III:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III);
            case SEMESTER_IV:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III, SEMESTER_IV);
            case SEMESTER_V:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III, SEMESTER_IV, SEMESTER_V);
            case SEMESTER_VI:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III, SEMESTER_IV, SEMESTER_V, SEMESTER_VI);
            case SEMESTER_VII:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III, SEMESTER_IV, SEMESTER_V, SEMESTER_VI, SEMESTER_VII);
            default:
                return new CustomArrayList<Semester>().addAll(SEMESTER_I, SEMESTER_II, SEMESTER_III, SEMESTER_IV, SEMESTER_V, SEMESTER_VI, SEMESTER_VII, SEMESTER_VIII);
        }
    }
}
