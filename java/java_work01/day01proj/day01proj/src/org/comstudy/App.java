package org.comstudy;

public class App {
    public static void main(String[] args) throws Exception {
        // 변수명 초기화는 변수를 선언할 때 초기 값을 넣어 주는 것.
        // 초기값은 리터럴이라고도 표현한다.
        // 변수 선언: 타입 변수명 = 초기값;
        // 타입은 기본타입(8가지), 참조타입
        // 기본 타입: 
        // - 논리형: boolean
        // - 실수형: float, double (부동소수점을 가진다. 기본형은 double) 3.14 != 3.14f
        // - 정수형: byte, short, int, long (정수형의 기본형은 int) 365 != 365L
        // - 문자형: char (문자형도 정수형에 속한다. 문자는 ASCII 코드이기 때문)
        // String은 문자열을 다루는 타입으로 기본형처럼 쓰이는 참조형(클래스)
        String greeting = "Hello, World!";

        System.out.println(greeting);
    }
}
