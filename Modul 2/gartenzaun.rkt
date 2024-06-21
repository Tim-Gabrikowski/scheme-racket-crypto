; Jedes 2. Element nehmen (t=#t -> erstes t=#f -> zweites)
(define (takeSecondStep i t a)
  (cond ((null? i) a)
        ((eq? t #t) (takeSecondStep (rest i) (not t) (append a (list (first i)))))
        (else (takeSecondStep (rest i) (not t) a))
  )
)
(define (takeSecond i t) (takeSecondStep i t '()))

(define (joinListsStep a b t r)
  (cond ((and (null? a) (null? b)) r)
        ((eq? t #t) (joinListsStep (rest a) b (not t) (append r (list (first a)))))
        (else (joinListsStep a (rest b) (not t) (append r (list (first b)))))
  )
)
(define (joinLists la lb) (joinListsStep la lb #t '()))

; GartenZaunEncryptCore
(define (gzec l)
  (append (takeSecond l #t) (takeSecond l #f))
)
; GartenZaunEncrypt
(define (gze s)
  (list->string (gzec (string->list s)))
)

; split List into "upper" and "lower" list (in a list as return)
(define (splitList l)
  (cons (reverse (list-tail (reverse l) (floor (/ (length l) 2)))) (list (list-tail l (ceiling (/ (length l) 2)))))
)

; GartenZaunDecryptCore
(define (gzdc l)
  (joinLists (first (splitList l)) (first (rest (splitList l))))
)
;GartenZaunDecrypt
(define (gzd s)
  (list->string (gzdc (string->list s)))
)