(require racket/list)
(load "./haufigkeit.rkt")

(define (extract-nth-elements lst n k)
  (cond
    [(empty? lst) '()]
    [(< (length lst) k) '()]
    [else (cons (list-ref lst (sub1 k)) 
                (extract-nth-elements (drop lst (min n (length lst))) n k))]))

; Main function to split list into sublists containing every nth element
(define (split-every-nth lst n)
  (define (loop k acc)
    (if (> k n)
        (reverse acc)
        (loop (add1 k) (cons (extract-nth-elements lst n k) acc))))
  (loop 1 '()))

(define raw_text "PWTMYTBADKDGPWPFYWFGUESOTLUPNVYWAPKCSOO
JWWASTLSUZUSJMJBBRSTIMGPYSXOJWWASMMZQLC
HJQWGYDHKOJWWASTMFPADWIPVKLHONZWPDPWRAA
GQPRKNJCNPKGPJJLTHYOWOHPGYJWCUEKUZLGAOW
KHOGPESMZMRWPBKVFVZTQNLAGSFSMVWTDPWRAAG
QPRKNJCNPTGTKEOMSGVLYVCHKBVKLOFOBLGNCIV
XWPLYBZAAEOOWKEWEODZKZOGPWGOMSWMPWTIFFL
CTUTYGUOSLZSILYOHEWEODSRVVYHSFAVVHHWGIP
TGHYHCWJVLERGJWKPDHGJWTUTQNBXGZEUKTWIAZ
PPMOGPWGJQWGYDHKNJCNPSOVWTZPFOMNQUQFGOW
PYTQNBAIVOSXNSNZNVHMSPAHCXBWVDTFJRWFLAS
XAGPHYHCWJVLEOANWKUPTXIYGUFFSQLLHZRKZFG
PYTXIYGUOWKVAEOEAOBBCVOSXVWKUMSGVLYVCHK
BOGYOSTSGGUYSTAAPKYWIPLBBRSRIKULYJUVWKU
PFHMDKLMWMMFRLCGUVKQSWAGVVWYNVLZSILYROM
KKJSBAZSWMOWKHMILSCKZAIRPWZHMGPYSXLWTNC
IVXWPIPNOMZGUSSXIMUIPYUUEGUKICMDEOPFMZM
RWPGOMYGOZSXBOKLGWKTWHYLUKVEWZDAGVEKUOS
YBWPZDHKTDGUFBJEWNJSSLZSILYYUMFPAPAGVKV
LWZKV")

(define filtered_text (list->string (filter letter? (string->list raw_text))))

(define (kasiskiAnalysis text n)
  (map (lambda (n) (convertCaseInsensitive (analyse (list->string n)))) (split-every-nth (string->list text) n))
)