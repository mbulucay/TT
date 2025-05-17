package com.TTCS.AviationRoutesApplication.mapper;

public interface RestMapper<E, D, R> {
    D toResponseDto(E entity);
    R toRequestDto(E entity);
}
